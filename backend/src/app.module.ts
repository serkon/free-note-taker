import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { PagesModule } from './pages/pages.module';
import { BlocksModule } from './blocks/blocks.module';
import { DatabasesModule } from './databases/databases.module';
import { PropertiesModule } from './properties/properties.module';
import { DatabaseRecordsModule } from './database-records/database-records.module';
import { CommentsModule } from './comments/comments.module';
import { PagesShareModule } from './pages-share/pages-share.module';
import { SearchModule } from './search/search.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WorkspacesModule,
    PagesModule,
    BlocksModule,
    DatabasesModule,
    PropertiesModule,
    DatabaseRecordsModule,
    CommentsModule,
    PagesShareModule,
    SearchModule,
    WebsocketModule,
  ],
})
export class AppModule {}
