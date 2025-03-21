import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { RecaptchaEnum } from 'src/recaptcha/interfaces/recaptcha.enum';
import { IConfig } from 'src/shared/config/interfaces/config.model';

@Injectable()
export class RecaptchaService {
  private client = new RecaptchaEnterpriseServiceClient({
    keyFilename: join(process.cwd(), 'google-cloud.json'),
  });

  constructor(private configService: ConfigService<IConfig>) {}

  async checkRecaptcha(token: string, action: RecaptchaEnum) {
    const { key, projectId } =
      this.configService.get<IConfig['recaptcha']>('recaptcha');

    const projectPath = this.client.projectPath(projectId);

    const [response] = await this.client.createAssessment({
      assessment: {
        event: {
          token,
          siteKey: key,
        },
      },
      parent: projectPath,
    });

    if (!response.tokenProperties.valid) {
      throw new BadRequestException('Token invalid');
    }

    if (!(response.tokenProperties.action === action)) {
      throw new BadRequestException('Wrong recaptcha action');
    }

    if (response.riskAnalysis.score < 0.5) {
      throw new BadRequestException('Try again later');
    }
  }
}
