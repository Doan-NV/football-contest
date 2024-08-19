import { Global, Module } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { ValidatorService } from './services/validator.service';

const providers = [ApiConfigService, ValidatorService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
