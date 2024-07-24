import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { getLocation } from '../../../services/locationService';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import "./ManageLocation.scss";
import './Pagination.scss'; // Import the new Pagination SCSS file

const ManageLocation = () => {
    const [locations, setLocations] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchLocations();
    }, [currentPage]);

    const fetchLocations = async () => {
        let response = await getLocation(currentPage+1, 3); 
        if(response && response.data.EC === 0) {
            setLocations(response.data.DT.locations);
            setPageCount(Math.ceil(response.data.DT.total / 3));
        }
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleGetPageUpdateLocation = (locationId) => {
        window.location.href = `/get-page-update-location/${locationId}`;
    };
    
      const handleDeleteLocation = async (locationId) => {
        // Call your delete location API endpoint
        // Example: await deleteLocation(locationId);
    
        // After deletion, you may want to refresh the locations
        fetchLocations();
      };

    return (
        <div>
            <h2>Quản lý địa điểm</h2>
            <Link to="/create-location">
                <Button className="add-location-button" color="primary">
                    Add Location
                </Button>
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Tên địa điểm</th>
                        <th>Mô tả</th>
                        <th>Bản đồ hoặc tọa độ</th>
                        <th>Ảnh 1</th>
                        <th>Ảnh 2</th>
                        <th>Ảnh 3</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {locations.map(location => (
                        <tr key={location.id}>
                            <td>{location.name}</td>
                            <td className='description-column'>{location.description}</td>
                            <td>{location.map}</td>
                            <td>
                                {location.image1 && (
                                    <img
                                        src={`${location.image1}`}
                                        alt="Ảnh 1"
                                        style={{ width: '70px', height: '70px' }}
                                    />
                                )}
                            </td>
                            <td>
                                {location.image2 && (
                                    <img
                                        src={`${location.image2}`}
                                        alt="Ảnh 2"
                                        style={{ width: '70px', height: '70px' }}
                                        onError={() => console.log('Error loading image')}
                                    />
                                )}
                            </td>
                            <td>
                                {location.image3 && (
                                    <img
                                        src={`${location.image3}`}
                                        alt="Ảnh 3"
                                        style={{ width: '70px', height: '70px' }}
                                    />
                                )}
                            </td>
                            <td className="actions-column icon-manage">
                                <i onClick={()=> handleGetPageUpdateLocation(location.id)} class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ReactPaginate
                previousLabel={"Trước"}
                nextLabel={"Sau"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}  // Ensure this matches the class name in your SCSS
            />
        </div>
    );
};

export default ManageLocation;
