import {inject} from '@loopback/core';
import {
  DefaultSequence,
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  Send,
  SequenceActions,
} from '@loopback/rest';

export class MySequence extends DefaultSequence {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
  ) {
    super(findRoute, parseParams, invoke, send, reject);
  }

  async handle(context: RequestContext) {
    try {
      const reqStartTime = new Date().getMilliseconds();
      // const hrStart = process.hrtime();
      // Invoke registered Express middleware
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      // findRoute() produces an element
      const route = this.findRoute(context.request);
      // parseParams() uses the route element and produces the params element
      const params = await this.parseParams(context.request, route);
      // invoke() uses both the route and params elements to produce the result (OperationRetVal) element
      const result = await this.invoke(route, params);
      // send() uses the result element
      this.send(context.response, result);
      const endTime = new Date().getMilliseconds() - reqStartTime;
      // const HRend = process.hrtime(hrStart);
      // console.log('Execution time: %dms', endTime);
      // console.log(
      //   'Execution time (hr): %ds %dms',
      //   HRend[0],
      //   HRend[1] / 1000000,
      // );
      console.log(
        '%s %s %d %dms',
        context.request.method,
        context.request.originalUrl,
        context.response.statusCode,
        endTime,
      );
    } catch (error) {
      this.reject(context, error);
    }
  }
}
