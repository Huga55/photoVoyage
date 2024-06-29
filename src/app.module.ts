import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Feedback } from "./modules/feedbacks/models/feddback.model";
import { User } from "./modules/users/models/user.model";
import { TelegrafModule } from "nestjs-telegraf";
import { UsersModule } from "./modules/users/users.module";
import { FeedbacksModule } from "./modules/feedbacks/feedbacks.module";
import { BotModule } from "./modules/bot/bot.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Feedback],
      autoLoadModels: true,
    }),
    TelegrafModule.forRoot({
      token: process.env.BOT_ID,
    }),
    UsersModule,
    FeedbacksModule,
    BotModule,
  ],
})
export class AppModule {}
