import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('SECOND_SERVICE') private readonly secondClient: ClientProxy,
    @Inject('THIRD_SERVICE') private readonly thirdClient: ClientProxy,
  ) {}

  @Get('/second')
  testSecondService(): Observable<string> {
    return this.secondClient.send<string>(
      { cmd: 'second_service' },
      'Message from',
    );
  }

  @Get('/third')
  testThirdService(): Observable<string> {
    return this.thirdClient.send<string>(
      { cmd: 'third_service' },
      'Message from',
    );
  }
}
