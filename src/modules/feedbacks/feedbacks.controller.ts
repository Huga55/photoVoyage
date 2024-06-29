import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FeedbacksService } from "./feedbacks.service";
import { Feedback } from "./models/feddback.model";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";

@ApiTags("Feedbacks")
@Controller("/api/feedback")
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @ApiOperation({ summary: "Create one feedback" })
  @ApiOkResponse({ status: 200, type: Feedback })
  @Post()
  async createOne(@Body() feedbackDto: CreateFeedbackDto) {
    return await this.feedbacksService.createFeedback(feedbackDto);
  }
}
