import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PieChart from '../components/PieChart';

jest.mock('@nivo/pie', () => ({
  ResponsivePie: ({ data }: { data: { id: string; label: string; value: number }[] }) => (
    <div data-testid="mock-pie-chart" role="chart" style={{ height: '400px', width: '100%' }}>
      {data.map((item) => (
        <div key={item.id}>
          {item.label}: {item.value}
        </div>
      ))}
    </div>
  ),
}));

describe('PieChart Component', () => {
  it('renders without crashing', () => {
    const mockData = [
      { id: 'slice1', label: 'Slice 1', value: 10 },
      { id: 'slice2', label: 'Slice 2', value: 20 },
      { id: 'slice3', label: 'Slice 3', value: 30 },
    ];

    render(<PieChart data={mockData} />);

    const chartContainer = screen.getByTestId('mock-pie-chart');
    expect(chartContainer).toBeInTheDocument();
  });

  it('displays the correct data points', () => {
    const mockData = [
      { id: 'slice1', label: 'Slice 1', value: 10 },
      { id: 'slice2', label: 'Slice 2', value: 20 },
      { id: 'slice3', label: 'Slice 3', value: 30 },
    ];

    render(<PieChart data={mockData} />);

    mockData.forEach((item) => {
      expect(screen.getByText(`${item.label}: ${item.value}`)).toBeInTheDocument();
    });
  });

  it('renders correctly with empty data', () => {
    const emptyData: { id: string; label: string; value: number }[] = [];

    render(<PieChart data={emptyData} />);

    const chartContainer = screen.getByTestId('mock-pie-chart');
    expect(chartContainer).toBeInTheDocument();
    expect(chartContainer).toBeEmptyDOMElement();
  });

  it('renders correctly with one data point', () => {
    const singleData = [{ id: 'slice1', label: 'Slice 1', value: 10 }];

    render(<PieChart data={singleData} />);

    const chartContainer = screen.getByTestId('mock-pie-chart');
    expect(chartContainer).toBeInTheDocument();
    expect(screen.getByText('Slice 1: 10')).toBeInTheDocument();
  });

  it('renders correctly with many data points', () => {
    const multipleData = [
      { id: 'slice1', label: 'Slice 1', value: 10 },
      { id: 'slice2', label: 'Slice 2', value: 20 },
      { id: 'slice3', label: 'Slice 3', value: 30 },
      { id: 'slice4', label: 'Slice 4', value: 40 },
    ];

    render(<PieChart data={multipleData} />);

    multipleData.forEach((item) => {
      expect(screen.getByText(`${item.label}: ${item.value}`)).toBeInTheDocument();
    });
  });

  it('has the correct accessibility attributes', () => {
    const mockData = [
      { id: 'slice1', label: 'Slice 1', value: 10 },
      { id: 'slice2', label: 'Slice 2', value: 20 },
    ];

    render(<PieChart data={mockData} />);

    const chartContainer = screen.getByTestId('mock-pie-chart');
    expect(chartContainer).toHaveAttribute('role', 'chart');
  });

  it('applies custom styling correctly', () => {
    const mockData = [
      { id: 'slice1', label: 'Slice 1', value: 10 },
      { id: 'slice2', label: 'Slice 2', value: 20 },
    ];

    const { container } = render(<PieChart data={mockData} />);
    const chartContainer = container.querySelector('div[data-testid="mock-pie-chart"]');

    expect(chartContainer).toHaveStyle('height: 400px');
  });

  it('triggers animation when data is updated', () => {
    const initialData = [
      { id: 'slice1', label: 'Slice 1', value: 10 },
      { id: 'slice2', label: 'Slice 2', value: 20 },
    ];

    const updatedData = [
      { id: 'slice1', label: 'Slice 1', value: 20 },
      { id: 'slice2', label: 'Slice 2', value: 30 },
    ];

    const { rerender } = render(<PieChart data={initialData} />);

    expect(screen.getByText('Slice 1: 10')).toBeInTheDocument();
    expect(screen.getByText('Slice 2: 20')).toBeInTheDocument();

    rerender(<PieChart data={updatedData} />);

    expect(screen.getByText('Slice 1: 20')).toBeInTheDocument();
    expect(screen.getByText('Slice 2: 30')).toBeInTheDocument();
  });

});