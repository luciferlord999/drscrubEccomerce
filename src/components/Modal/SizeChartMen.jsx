import React from "react";
import { motion } from "framer-motion";

function SizeChartMen({ hide }) {
  function Hidden() {
    hide(false);
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 5, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="newsletter__popup newsletter__show"
        data-animation="slideInUp"
      >
        <div id="boxes" className="newsletter__popup--inner">
          <button
            className="newsletter__popup--close__btn"
            aria-label="search close button"
            onClick={Hidden}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </button>
          <div className="box newsletter__popup--box d-flex align-items-center">
            <div
              className="newsletter__popup--thumbnail w-100"
              style={{ padding: "23px" }}
            >
              <div className="col-12">
                <div className="text-center mt-3">
                  <h3>Size Chart</h3>
                  <p>
                    These sizes correspond to your body measurement in inches
                  </p>
                  <table
                    className="d-none d-lg-block desktop-size-chart"
                    style={{ fontSize: 12, marginBottom: "30px" }}
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    width="100%"
                  >
                    <tbody style={{ display: "unset" }}>
                      <tr>
                        <td className="newborder3" height={15} width={41}>
                          SIZE
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          XS
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          S
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          M
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          L
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          XL
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          XXL
                        </td>
                        <td className="newborder2" align="center" height={15}>
                          XXXL
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          Chest
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          38
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          40
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          42
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          44
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          46
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          48
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={29}
                          width={41}
                        >
                          50
                        </td>
                      </tr>
                      <tr className="bustSize-chart">
                        <td className="newborder3" height={25} width={41}>
                          Waist
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          37
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          39
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          41
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          43
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          45
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          47
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={25}
                          width={41}
                        >
                          49
                        </td>
                      </tr>
                      <tr>
                        <td className="newborder3" height={31} width={41}>
                          Hip
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          38
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          40
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          42
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          44
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          46
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          48
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={31}
                          width={41}
                        >
                          50
                        </td>
                      </tr>
                      <tr>
                        <td className="newborder3" height={30} width={41}>
                          Total Length
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          27.5
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          28
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          28.5
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          29
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          29(1/2)
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          30
                        </td>
                        <td
                          className="newborder2"
                          align="center"
                          height={30}
                          width={41}
                        >
                          30(1/2)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SizeChartMen;
