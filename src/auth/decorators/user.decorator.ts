import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IJwtUser;
});
