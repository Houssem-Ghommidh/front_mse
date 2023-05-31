import { Paper, useTheme } from '@mui/material';
import React  from 'react';
import { tokens } from '../../theme';

const InfoBox = ({color, title, value, Icon}) => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const styles = {
      content: {
        padding: '5px 10px',
        marginLeft: 90,
        height: 90,
        backgroundColor: colors.primary[400]
      },
      number: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.grey[100]
      },
      text: {
        fontSize: 20,
        fontWeight: 300,
        color: colors.grey[100]
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%',
        color:'white'

      }
    };

    return (
      <Paper >
        <span style={styles.iconSpan}>
          <Icon color={"white"}
                style={styles.icon}
          />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
      );
  }




export default InfoBox;