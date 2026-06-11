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
            this.logger.log(`   ↳ Request: \n  ${JSON.stringify(request.body || {}, null, 2)}`);
            this.logger.log(`   ↳ Response: \n ${JSON.stringify(parsedResponse || {}, null, 2)}`);
        });

        next();
    }
}