import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDTypography from "../MDTypography";

const AMAAH4 = forwardRef(({ children, ...rest }, ref) => (
  <MDTypography {...rest} ref={ref} variant="h4" component="h4">
    {children}
  </MDTypography>
));

AMAAH4.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AMAAH4;
