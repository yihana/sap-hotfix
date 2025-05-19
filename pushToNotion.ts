import { Client } from '@notionhq/client';
import hotfixes from './hotfixes.json' assert { type: 'json' };
import 'dotenv/config';

const notion = new Client({ auth: process.env.NOTION_SECRET });

for (const note of hotfixes) {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      제목: { title: [{ text: { content: note.title } }] },
      '노트 번호': { rich_text: [{ text: { content: note.noteId } }] },
      날짜: { date: { start: note.date } },
      링크: { url: note.link }
    }
  });
}
