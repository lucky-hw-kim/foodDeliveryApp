import { client } from "../../lib/client";
import Layout from "../../components/Layout";
import css from "../../styles/Process.module.css";
export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);
  return {
    props: {
      order: order[0],
    },
  };
};

export default function Orders({ order }) {
  return (
    <Layout>
      <div className={css.container}>
        <span className={css.heading}>Order in Process</span>
        <div className={css.details}>
          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
