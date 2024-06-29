import { forwardRef, Module } from "@nestjs/common";
import { FeedbacksService } from "./feedbacks.service";
import { FeedbacksController } from "./feedbacks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Feedback } from "./models/feddback.model";
import { BotModule } from "../bot/bot.module";

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
  imports: [
    SequelizeModule.forFeature([Feedback]),
    forwardRef(() => BotModule),
  ],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
