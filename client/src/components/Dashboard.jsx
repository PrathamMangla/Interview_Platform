import React, { useState } from 'react';
import { Container, Typography, Grid, TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import InterviewDetailsCard from './InterviewDetailsCard';

function Dashboard() {
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={selectedInterview ? 6 : 12}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow 
                    key={interview._id}
                    hover
                    onClick={() => handleInterviewClick(interview)}
                    sx={{ cursor: 'pointer' }}
                  >
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {selectedInterview && (
          <Grid item xs={12} md={6}>
            <InterviewDetailsCard interview={selectedInterview} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard; 