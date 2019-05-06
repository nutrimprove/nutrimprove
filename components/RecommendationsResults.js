import PropTypes from 'prop-types';
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import Paper from "@material-ui/core/Paper/index";
import Table from "@material-ui/core/Table/index";
import TableBody from "@material-ui/core/TableBody/index";
import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({
   root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      minWidth: 700,
   },
   table: {
      minWidth: 700,
   },
   cell: {
      padding: 10,
   },
   foodName: {
      minWidth: 100,
      padding: 10,
   }
});

const ResultsTable = (props) => {
   const {classes, values} = props;

   if (values && values.length > 0) {
      return (
         <div id='recommendations-results'>
            <Paper className={classes.root}>
               <Table className={classes.table}>
                  <TableHead>
                     <TableRow>
                        <TableCell className={classes.cell}>id</TableCell>
                        <TableCell className={classes.cell}>Food</TableCell>
                        <TableCell className={classes.cell}>Recommendation</TableCell>
                        <TableCell className={classes.cell}>Contributor</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {values.map((value, vIndex) => (
                        <TableRow key={vIndex}>
                           {Object.keys(value).map((key, kIndex) => (
                              <TableCell key={kIndex} className={classes.cell}>
                                 {value[key]}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Paper>
         </div>
      )
   } else {
      return (
         <div id='results'/>
      )
   }
};

ResultsTable.propTypes = {
   classes: PropTypes.object.isRequired,
   values: PropTypes.array.isRequired,
};

export default withStyles(styles)(ResultsTable);
