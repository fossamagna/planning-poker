import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import { ListRoomsQuery } from '../../src/API';
import { listRooms } from '../../src/graphql/queries';

type Props = { nowDate: string; data: ListRoomsQuery };

const SSRDemo = ({ nowDate, data }: Props) => {
  return (
    <div>
      SSR demo: {nowDate}
      <br />
      {data.listRooms && (
        <ul>
          {data.listRooms.items.map((room) => {
            return (
              <li key={room.id}>
                ID: {room.id} / {room.createdAt} /
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const result = (await API.graphql({
    query: listRooms,
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
  })) as { data: ListRoomsQuery };
  return {
    props: {
      nowDate: new Date().toLocaleString(undefined, { timeZone: 'Asia/Tokyo' }),
      data: result.data,
    },
  };
};

export default SSRDemo;