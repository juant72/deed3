import React from "react";
import { Loader } from "../Components";

const DetailSeven: React.FC<{
  property,
  setUpdatePropertyPrice,
  updatePropertyPrice,
  updatepropertyPrice,
  updatePriceLoading,
}> = ({
  property,
  setUpdatePropertyPrice,
  updatePropertyPrice,
  updatepropertyPrice,
  updatePriceLoading,
}) => {
  return (
    <div
      className="rn-popup-modal report-modal-wrapper modal fade"
      id="reportModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content report-content-wrapper">
          <div className="modal-header report-modal-header">
            <h5 className="modal-title">Update Property Price</h5>
          </div>
          <div className="modal-body">
            <p>
              Hey {property?.owner.slice(0, 15)}... , Kindly update your
              property price
            </p>
            <div className="report-form-box">
              <h6 className="title">Price</h6>
              <textarea
                name="message"
                placeholder={`Old Price: ${property?.price} MATIC`}
                onChange={(e) =>
                  setUpdatePropertyPrice({
                    ...updatePropertyPrice,
                    price: e.target.value,
                  })
                }
              ></textarea>
              <div className="report-button">
                <button
                  onClick={() => updatepropertyPrice()}
                  type="button"
                  className="btn btn-primary mr--10 w-auto"
                >
                  {updatePriceLoading ? <Loader /> : "Update Price"}
                </button>

                <button
                  type="button"
                  className="btn btn-primary-alta w-auto"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSeven;
