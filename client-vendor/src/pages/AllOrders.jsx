import { useEffect } from "react";
import Table from "react-bootstrap/Table";
// import { Link } from "react-router-dom";
import OrderRow from "../components/OrderRow";

function ProductsTable() {
  const fetctAllProducts = async () => {
    try {
      // fetch di sini
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetctAllProducts();
  }, []);

  //   const handleDelete = async (id) => {
  //     try {
  //       await dispatcher(deleteProductAction(id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div className="containerFetch d-flex justify-content-center">
      <div className="col-11">
        <h2 className="text-center fw-bold mt-5 mb-3 headerText">Your Customer Orders</h2>
        <div className="bg-light rounded p-3 text-center shadow-lg" style={{height: 575}}>
          <Table striped rouhover size="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Customer Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Reservation Date</th>
                <th>Reschedule Date</th>
                <th>Reschedule Status</th>
                <th>Payment Status</th>
                <th>Total Payment (IDR)</th>
                <th>Down Payment (IDR)</th>
                <th>Payment Due</th>
                <th>Notes</th>
                <th className="">Detail</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* {allProducts?.map((el, i) => {
                return ( */}
              {/* <tr key={el.id}> */}
              <OrderRow/>
              {/* );
              })} */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
