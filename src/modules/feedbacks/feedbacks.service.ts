import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Feedback } from "./models/feddback.model";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { BotService } from "../bot/bot.service";

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback) private feedbackRepository: typeof Feedback,
    private botService: BotService,
  ) {}

  async createFeedback(feedbackDto: CreateFeedbackDto) {
    const feedback = await this.feedbackRepository.create(feedbackDto);

    await this.botService.sendNewFeedback(feedback);

    return feedback;
  }

  async getAllFeedbacks() {
    return await this.feedbackRepository.findAll();
  }

  async getOnlyActiveFeedbacks() {
    return await this.feedbackRepository.findAll({ where: { isActive: true } });
  }

  async changeIsActive(isActive: boolean, id: number) {
    return await this.feedbackRepository.update(
      { isActive },
      { where: { id } },
    );
  }
}
