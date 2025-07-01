import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../components/dashboard/Dashboard';
import PropertySummary from '../../components/dashboard/PropertySummary';
import RecentActivity from '../../components/dashboard/RecentActivity';
import Statistics from '../../components/dashboard/Statistics';
import Notifications from '../../components/dashboard/Notifications';

// Mock the child components to simplify testing
jest.mock('../../components/dashboard/PropertySummary', () => {
  return jest.fn(() => <div data-testid="property-summary">PropertySummary Component</div>);
});

jest.mock('../../components/dashboard/RecentActivity', () => {
  return jest.fn(() => <div data-testid="recent-activity">RecentActivity Component</div>);
});

jest.mock('../../components/dashboard/Statistics', () => {
  return jest.fn(() => <div data-testid="statistics">Statistics Component</div>);
});

jest.mock('../../components/dashboard/Notifications', () => {
  return jest.fn(() => <div data-testid="notifications">Notifications Component</div>);
});

jest.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  })
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dashboard with default properties tab', () => {
    render(<Dashboard />);
    
    // Check if the dashboard title is rendered
    expect(screen.getByText('My Dashboard')).toBeInTheDocument();
    
    // Check if the PropertySummary component is rendered by default
    expect(screen.getByTestId('property-summary')).toBeInTheDocument();
    
    // Check if the Notifications component is rendered
    expect(screen.getByTestId('notifications')).toBeInTheDocument();
    
    // The other tabs should not be visible
    expect(screen.queryByTestId('recent-activity')).not.toBeInTheDocument();
    expect(screen.queryByTestId('statistics')).not.toBeInTheDocument();
  });

  it('switches tabs when clicking on the navigation buttons', () => {
    render(<Dashboard />);
    
    // Initially PropertySummary should be visible
    expect(screen.getByTestId('property-summary')).toBeInTheDocument();
    
    // Click on Recent Activity tab
    fireEvent.click(screen.getByText('Recent Activity'));
    expect(screen.getByTestId('recent-activity')).toBeInTheDocument();
    expect(screen.queryByTestId('property-summary')).not.toBeInTheDocument();
    expect(screen.queryByTestId('statistics')).not.toBeInTheDocument();
    
    // Click on Statistics tab
    fireEvent.click(screen.getByText('Statistics'));
    expect(screen.getByTestId('statistics')).toBeInTheDocument();
    expect(screen.queryByTestId('property-summary')).not.toBeInTheDocument();
    expect(screen.queryByTestId('recent-activity')).not.toBeInTheDocument();
    
    // Click on Properties tab again
    fireEvent.click(screen.getByText('Properties'));
    expect(screen.getByTestId('property-summary')).toBeInTheDocument();
    expect(screen.queryByTestId('recent-activity')).not.toBeInTheDocument();
    expect(screen.queryByTestId('statistics')).not.toBeInTheDocument();
  });

  it('opens and closes the export menu', () => {
    render(<Dashboard />);
    
    // Export menu should not be visible initially
    expect(screen.queryByText('Export as PDF')).not.toBeInTheDocument();
    
    // Click on Export button
    fireEvent.click(screen.getByText('Export'));
    
    // Export options should be visible
    expect(screen.getByText('Export as PDF')).toBeInTheDocument();
    expect(screen.getByText('Export as CSV')).toBeInTheDocument();
    expect(screen.getByText('Export as Excel')).toBeInTheDocument();
    
    // Click on Export again to close the menu
    fireEvent.click(screen.getByText('Export'));
    
    // Export options should be hidden again
    expect(screen.queryByText('Export as PDF')).not.toBeInTheDocument();
  });

  it('toggles customization mode', () => {
    render(<Dashboard />);
    
    // Customization modal should not be visible initially
    expect(screen.queryByText('Dashboard Customization')).not.toBeInTheDocument();
    
    // Click on Customize button
    fireEvent.click(screen.getByText('Customize'));
    
    // Customization modal should be visible
    expect(screen.getByText('Dashboard Customization')).toBeInTheDocument();
    
    // Text should change to "Save Layout"
    expect(screen.getByText('Save Layout')).toBeInTheDocument();
    
    // Click on Save Layout button to exit customization mode
    fireEvent.click(screen.getByText('Save Layout'));
    
    // Customization modal should be hidden again
    expect(screen.queryByText('Dashboard Customization')).not.toBeInTheDocument();
  });

  it('shows settings tab when clicked', () => {
    render(<Dashboard />);
    
    // Click on Settings tab
    fireEvent.click(screen.getByText('Settings'));
    
    // Settings content should be visible
    expect(screen.getByText('Dashboard Settings')).toBeInTheDocument();
    expect(screen.getByText('Personalization')).toBeInTheDocument();
    
    // Other tabs should not be visible
    expect(screen.queryByTestId('property-summary')).not.toBeInTheDocument();
    expect(screen.queryByTestId('recent-activity')).not.toBeInTheDocument();
    expect(screen.queryByTestId('statistics')).not.toBeInTheDocument();
  });
});
