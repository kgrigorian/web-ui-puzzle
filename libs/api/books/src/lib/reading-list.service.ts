import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async markAsRead(item: ReadingListItem, isoDate: string): Promise<void> {

    this.storage.update(list => {
      return list.map(listItem => {
        if (listItem.bookId === item.bookId) {
        const { bookId, finished, finishedDate,  ...rest} = listItem
        return <ReadingListItem>{ bookId: item.bookId, finished: true, finishedDate: isoDate, ...rest}
        }
        return listItem;
      });
    });
  }
}
