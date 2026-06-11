import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { method, originalUrl } = request;

        // Intercept the response.send method to capture the outgoing payload
        const originalSend = response.send;
        let responseBody: any;

        response.send = function (body: any) {
            responseBody = body;
            return originalSend.call(this, body);
        };

        response.on('finish', () => {
            const { statusCode } = response;
            let parsedResponse = responseBody;
            try {
                if (typeof responseBody === 'string') parsedResponse = JSON.parse(responseBody);
            } catch (e) { /* leave as string if not JSON */ }

            this.logger.log(`[${method}] ${originalUrl} ${statusCode}`);
            this.logger.log(`   ↳ Request:  ${JSON.stringify(request.body || {})}`);
            this.logger.log(`   ↳ Response: ${JSON.stringify(parsedResponse || {})}`);
        });

        next();
    }
}