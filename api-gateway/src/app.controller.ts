import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('THIRD_SERVICE') private readonly thirdClient: ClientProxy,
  ) {}

  @Get('/third')
  testThirdService(): Observable<string> {
    return this.thirdClient.send<string>(
      { cmd: 'third_service' },
      'Message from',
    );
  }
}
