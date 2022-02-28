import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '../test-utils';
import SearchBar from '../../src/components/nav/SearchBar.jsx';


describe('SearchBar', () => {

  test('SearchBar should exist', () => {

    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search @users and #hashtags')).toBeInTheDocument;

  });


});