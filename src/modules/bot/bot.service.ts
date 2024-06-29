import {
  Update,
  Ctx,
  Start,
  Help,
  Hears,
  InjectBot,
  On,
} from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { commandList, requireAuthMessage } from "./bot.const";
import { FeedbacksService } from "../feedbacks/feedbacks.service";
import { Feedback } from "../feedbacks/models/feddback.model";
import { UsersService } from "../users/users.service";

@Update()
@Injectable()
export class BotService {
  private correctSecretPhrase = process.env.BOT_SECRET_PHRASE;

  constructor(
    @Inject(forwardRef(() => FeedbacksService))
    private feedbacksService: FeedbacksService,
    @InjectBot()
    private bot: Telegraf<Context>,
    private usersService: UsersService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply("Приветствую!");
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    const commands = commandList
      .map(({ command, description }) => `${command} - ${description}`)
      .join("\n");

    const isAuth = await this.checkAuth(String(ctx.chat.id));

    if (!isAuth) return requireAuthMessage;

    await ctx.reply(`Список команд:\n ${commands}`);
  }

  @Hears("/orders")
  async hears(@Ctx() ctx: Context) {
    const orders = await this.feedbacksService.getAllFeedbacks();
    const ordersString = orders
      .map((feedback, index) =>
        this.getStringByFeedback(feedback, `${index + 1}) `),
      )
      .join("\n\n");

    const isAuth = await this.checkAuth(String(ctx.chat.id));

    if (!isAuth) return requireAuthMessage;

    await ctx.reply(ordersString || "Заявок нет");
  }

  @On("message")
  async message(@Ctx() ctx: Context) {
    //@ts-expect-error
    const message = ctx.update?.message?.text;

    if (message.match(/^\/auth.*/)) return this.auth(ctx);

    await ctx.reply("Неверная команда");
  }

  private async auth(ctx: Context) {
    //@ts-expect-error
    const message = ctx.update?.message?.text;

    const secretPhrase = message.split(" ")?.[1]?.trim();

    if (this.correctSecretPhrase && secretPhrase === this.correctSecretPhrase) {
      //@ts-expect-error
      const id = ctx.update.message.from.id;

      if (await this.checkAuth(id)) {
        return "Вы уже зарегистрированы";
      }

      await this.usersService.createOne({
        password: "",
        email: String(id),
        isAdmin: true,
        name: String(id),
        telegramId: id,
      });

      return "Успешная регистрация";
    }

    return "Неверная секретная фраза";
  }

  private async checkAuth(id: string) {
    return !!(await this.usersService.getOneByTgId(id));
  }

  async sendNewFeedback(feedback?: Feedback) {
    const admins = await this.usersService.getAdmins();

    for (const user of admins) {
      const tgId = user.telegramId;
      tgId &&
        (await this.bot.telegram.sendMessage(
          tgId,
          this.getStringByFeedback(feedback, "Новая заявка: \n"),
        ));
    }
  }

  private getStringByFeedback(
    { name, phone, comment }: Feedback,
    prefix?: string,
  ) {
    return `${prefix}Имя: ${name},\nТелефон: ${phone},\nКомментарий: ${comment}`;
  }
}
