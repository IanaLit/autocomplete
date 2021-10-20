import axios, { AxiosResponse } from 'axios';
import { getPhotos, getUsers } from '../api';
import { Photo } from '../types/photo';
import { User } from '../types/users';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
export const users: User[] = [
  {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
              "lat": "-37.3159",
              "lng": "81.1496"
          }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
      }
  },
  {
      id: 9,
      name: "Glenna Reichert",
      username: "Delphine",
      email: "Chaim_McDermott@dana.io",
      address: {
          street: "Dayna Park",
          suite: "Suite 449",
          city: "Bartholomebury",
          zipcode: "76495-3109",
          geo: {
              lat: "24.6463",
              lng: "-168.8889"
          }
      },
      phone: "(775)976-6794 x41206",
      website: "conrad.com",
      company: {
          name: "Yost and Sons",
          catchPhrase: "Switchable contextually-based project",
          bs: "aggregate real-time technologies"
      }
  }
];
const photos: Photo[] = [
  {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
  }
];
const mockedUsersResponse: AxiosResponse = {
  data: users,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
const mockedPhotosResponse: AxiosResponse = {
  data: photos,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('getUsers()', () => {
  test('should return users list', async () => {
    mockedAxios.get.mockResolvedValue(mockedUsersResponse); 
    expect(axios.get).not.toHaveBeenCalled();   
    const data = await getUsers();
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(users);
  });
});

describe('getPhotos()', () => {
    test('should return photos list', async () => {
      mockedAxios.get.mockResolvedValue(mockedPhotosResponse);
      expect(axios.get).not.toHaveBeenCalled();
      const data = await getPhotos();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(data).toEqual(photos);
    });
  });
