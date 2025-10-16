import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip, LinearProgress,
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton
} from '@mui/material';
import { IconPlus, IconCalendar, IconUsers, IconTarget, IconClock, IconEdit, IconTrash, IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const ProjectsMain = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', client: 'ABC Corp', progress: 75, status: 'In Progress', deadline: '2024-02-15', team: 4, budget: 15000 },
    { id: 2, name: 'Mobile App Development', client: 'XYZ Ltd', progress: 45, status: 'In Progress', deadline: '2024-03-20', team: 6, budget: 25000 },
    { id: 3, name: 'Database Migration', client: 'Tech Solutions', progress: 100, status: 'Completed', deadline: '2024-01-10', team: 3, budget: 8000 },
    { id: 4, name: 'E-commerce Platform', client: 'Online Store', progress: 20, status: 'Planning', deadline: '2024-04-30', team: 8, budget: 40000 }
  ]);

  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', client: '', progress: 0, status: 'Planning', team: 0, budget: 0, deadline: '' });

  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

  const handleAdd = () => {
    setEditProject(null);
    setFormData({ name: '', client: '', progress: 0, status: 'Planning', team: 0, budget: 0, deadline: '' });
    setOpen(true);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setFormData(project);
    setOpen(true);
  };

  const handleSave = () => {
    if (editProject) {
      setProjects(projects.map(p => p.id === editProject.id ? { ...formData, id: editProject.id } : p));
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProgress = (id, newProgress) => {
    setProjects(projects.map(p => p.id === id ? { ...p, progress: Math.min(100, Math.max(0, newProgress)) } : p));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'primary';
      case 'Planning': return 'warning';
      default: return 'default';
    }
  };

  return (
    <PageContainer title="Projects" description="Project Management System">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Projects Dashboard</Typography>
          <Button variant="contained" startIcon={<IconPlus />} onClick={handleAdd}>
            New Project
          </Button>
        </Box>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f8f9ff',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#e8eaff',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#5a67d8' }}>🎯</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {projects.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Projects
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#fffbf0',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#fed7aa',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#d69e2e' }}>⏳</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {activeProjects}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Active Projects
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f0fff4',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#c6f6d5',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#38a169' }}>✅</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {completedProjects}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Completed
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#fff5f5',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#fed7d7',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#e53e3e' }}>💰</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    ₹{totalBudget.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Budget
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>Project Overview</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Project Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Client</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Progress</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Team Size</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Budget</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Deadline</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project, index) => (
                    <TableRow key={project.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
                      <TableCell sx={{ fontWeight: 'medium' }}>{project.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{project.client}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton size="small" onClick={() => updateProgress(project.id, project.progress - 10)}>
                            <IconTrendingDown />
                          </IconButton>
                          <LinearProgress 
                            variant="determinate" 
                            value={project.progress} 
                            sx={{ width: 100 }}
                          />
                          <Typography variant="body2">{project.progress}%</Typography>
                          <IconButton size="small" onClick={() => updateProgress(project.id, project.progress + 10)}>
                            <IconTrendingUp />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={project.status} 
                          color={getStatusColor(project.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{project.team}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>₹{project.budget.toLocaleString()}</TableCell>
                      <TableCell>{project.deadline}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(project)} size="small">
                          <IconEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(project.id)} size="small" color="error">
                          <IconTrash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>{editProject ? 'Edit Project' : 'New Project'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Client"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Progress (%)"
                  type="number"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Team Size"
                  type="number"
                  value={formData.team}
                  onChange={(e) => setFormData({...formData, team: parseInt(e.target.value) || 0})}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value) || 0})}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  margin="normal"
                  SelectProps={{ native: true }}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ProjectsMain;