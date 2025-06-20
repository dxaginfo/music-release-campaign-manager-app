import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CampaignCard from './CampaignCard';
import CampaignFilter from './CampaignFilter';
import { fetchCampaigns } from '../../services/campaignService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  filterContainer: {
    marginBottom: theme.spacing(3),
  },
  addButton: {
    marginLeft: theme.spacing(2),
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  statsCard: {
    marginBottom: theme.spacing(3),
  },
  statsValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
}));

const CampaignDashboard = () => {
  const classes = useStyles();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: 'all',
    artist: 'all',
    dateRange: 'all',
  });

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        const data = await fetchCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (error) {
        console.error('Error loading campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  useEffect(() => {
    // Apply filters when filter state changes
    const applyFilters = () => {
      let result = [...campaigns];

      // Filter by status
      if (filter.status !== 'all') {
        result = result.filter((campaign) => campaign.status === filter.status);
      }

      // Filter by artist
      if (filter.artist !== 'all') {
        result = result.filter((campaign) => campaign.artist._id === filter.artist);
      }

      // Filter by date range
      if (filter.dateRange === 'upcoming') {
        const now = new Date();
        result = result.filter((campaign) => new Date(campaign.releaseDate) > now);
      } else if (filter.dateRange === 'past') {
        const now = new Date();
        result = result.filter((campaign) => new Date(campaign.releaseDate) < now);
      }

      setFilteredCampaigns(result);
    };

    applyFilters();
  }, [campaigns, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const getStatsData = () => {
    return {
      total: campaigns.length,
      active: campaigns.filter((c) => c.status === 'active').length,
      upcoming: campaigns.filter((c) => c.status === 'planning' || c.status === 'in-progress').length,
      completed: campaigns.filter((c) => c.status === 'completed').length,
    };
  };

  const stats = getStatsData();

  if (loading) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" className={classes.title}>
          Campaign Dashboard
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            href="/campaigns/new"
          >
            New Campaign
          </Button>
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} className={classes.statsCard}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Campaigns
                </Typography>
                <Typography variant="h5" component="h2" className={classes.statsValue}>
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Campaigns
                </Typography>
                <Typography variant="h5" component="h2" className={classes.statsValue}>
                  {stats.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Upcoming Campaigns
                </Typography>
                <Typography variant="h5" component="h2" className={classes.statsValue}>
                  {stats.upcoming}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed Campaigns
                </Typography>
                <Typography variant="h5" component="h2" className={classes.statsValue}>
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filter Section */}
        <div className={classes.filterContainer}>
          <CampaignFilter onFilterChange={handleFilterChange} filter={filter} />
        </div>

        {/* Campaign Cards */}
        <Grid container spacing={3}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign._id}>
                <CampaignCard campaign={campaign} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No campaigns found matching your filters.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default CampaignDashboard;