import { forwardRef, Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { FeedbacksModule } from "../feedbacks/feedbacks.module";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [],
  providers: [BotService],
  imports: [forwardRef(() => FeedbacksModule), UsersModule],
  exports: [BotService],
})
export class BotModule {}
