import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import NavBarRestaurant from './NavBarRestaurant'
import '../css/RestaurantPage/MenuItem.css'
import { toast } from 'react-toastify'
import Subheading from '../Subheading'

export default function MenuItem() {

    const goLoginPage = useNavigate();

    let userEmail = sessionStorage.getItem('userEmail')
    let username = sessionStorage.getItem('username')

    useEffect(() => {
        if (userEmail === "" || userEmail === null) {
            goLoginPage("/")
        }
    }, [])

    const labelStyle = {
        backgroundColor: '#e6e6e8'
    }

    // Menu item session
    const [menuItem, setMenuItem] = useState([])

    useEffect(() => {
        fetch(`http://` + window.location.host.split(":")[0] + `:8000/meal?restaurant=${username}`)
            .then(response => response.json())
            .then(jsonData => setMenuItem(jsonData))
    }, [])

    let rowElement = document.querySelectorAll('.rest-menu-item-table-row')

    rowElement.forEach(row => {
        row.onclick = () => {
            rowElement.forEach(otherRow => {
                otherRow.classList.remove('active')
            })
            row.classList.add('active')
        }
    })

    useEffect(() => {
        let rowElement = document.querySelectorAll('.rest-menu-item-table-row')

        rowElement.forEach(row => {
            row.onclick = () => {
                rowElement.forEach(otherRow => {
                    otherRow.classList.remove('active')
                })
                row.classList.add('active')
            }
        })
    }, [menuItem])

    // Search meal

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        fetch(`http://` + window.location.host.split(":")[0] + `:8000/meal?restaurant=${username}&foodName_like=${searchTerm}`)
            .then(response => response.json())
            .then(jsonData => setMenuItem(jsonData))
            .catch(error => console.error(error));
    }

    // Add new item
    const [addNewItemShow, setAddNewItemShow] = useState(false)
    const [addImage, setAddImage] = useState(null);

    const handleAddImageChange = (event) => {
        const file = event.target.files[0];
        setAddImage(file);
    };

    let mealStyleList = ["Chinese food", "Western food", "Fast food", "Japanese food", "Tasty dessert", "HK's style food"]

    const showStyleList = () => {
        const btn = document.querySelector('#dropdown-btn1')
        const option = document.querySelector('#input-option1')
        btn.classList.toggle('active')
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    }

    const closeStyleList = () => {
        const btn = document.querySelector('#dropdown-btn1')
        const option = document.querySelector('#input-option1')
        btn.classList.remove('active')
        option.style.display = option.style.display === 'block' ? 'none' : 'block';
    }

    const clearAddMealForm = () => {
        setMealName('')
        setMealStyle('')
        setMealPrice('')
        setMealDescription('')
        setAddImage(null)
        setModifyImage(null);
    }

    const [mealName, setMealName] = useState('')
    const [mealStyle, setMealStyle] = useState('')
    const [mealPrice, setMealPrice] = useState('')
    const [mealImage, setMealImage] = useState('')
    const [mealDescription, setMealDescription] = useState('')

    const saveNewMeal = async(e) => {
        e.preventDefault()

        const response = await fetch(`http://` + window.location.host.split(":")[0] + `:8000/user?username=${username}`)
        const jsonData = await response.json()

        let mealObj = {
            "foodName": mealName,
            "restaurant": username,
            "address": jsonData[0].address,
            "img": mealImage.replace("C:\\fakepath\\", ""),
            "foodStyle": mealStyle,
            "price": mealPrice,
            "spendTime": 15,
            "description": mealDescription
        }

        fetch("http://" + window.location.host.split(":")[0] + ":8000/meal", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(mealObj)
        }).then(() => {
            toast.success('Add successfully')

            fetch(`http://` + window.location.host.split(":")[0] + `:8000/meal?restaurant=${username}`)
                .then(response => response.json())
                .then(jsonData => {
                    setMenuItem(jsonData)
                    setAddNewItemShow(false)
                    clearAddMealForm()
                })
            // setTimeout(()=>{window.location.href = window.location.href}, 500)
        }).catch((err) => {
            toast.error('Failed :' + err.message)
        })
    }


    // Modify item
    const [modifyItemShow, setModifyItemShow] = useState(false)
    const [modifyImage, setModifyImage] = useState(null);

    const handleModifyImageChange = (event) => {
        const file = event.target.files[0];
        setModifyImage(file);
    };

    const showEditIteminfo = (mealID, itemImg) => {
        fetch(`http://` + window.location.host.split(":")[0] + `:8000/meal?id=${mealID}`)
        .then(response => response.json())
        .then(jsonData => {
            var mealName = document.getElementById('oldMealName')
            setEditMealName(jsonData[0].foodName)
            mealName.value = jsonData[0].foodName

            var mealStyle = document.getElementById('oldMealStyle')
            setEditMealStyle(jsonData[0].foodStyle)
            mealStyle.value = jsonData[0].foodStyle

            var mealPrice = document.getElementById('oldMealPrice')
            setEditMealPrice(jsonData[0].price)
            mealPrice.value = jsonData[0].price

            var mealImage = document.getElementById('oldMealImage')
            if(mealImage !== null) {
                mealImage.src = process.env.PUBLIC_URL + '/img/' + itemImg
            }

            var mealDesc = document.getElementById('oldMealDesc')
            setEditMealDescription(jsonData[0].description)
            mealDesc.value = jsonData[0].description
        })
    }

    const [mealID, setMealID] = useState('')

    const [editMealName, setEditMealName] = useState('')
    const [editMealStyle, setEditMealStyle] = useState('')
    const [editMealPrice, setEditMealPrice] = useState('')
    const [editMealImage, setEditMealImage] = useState('')
    const [editMealDescription, setEditMealDescription] = useState('')

    const saveEditMeal = (e) => {
        e.preventDefault()

        let updatedMealObj = {
            "foodName": editMealName,
            "img": editMealImage.replace("C:\\fakepath\\", ""),
            "foodStyle": editMealStyle,
            "price": editMealPrice,
            "description": editMealDescription
        }

        if(updatedMealObj.img == '') {
            delete updatedMealObj.img
        }

        fetch(`http://${window.location.host.split(":")[0]}:8000/meal/${mealID}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMealObj)
        }).then(() => {
            toast.success('Update successfully')

            fetch(`http://` + window.location.host.split(":")[0] + `:8000/meal?restaurant=${username}`)
                .then(response => response.json())
                .then(jsonData => setMenuItem(jsonData))

            setModifyItemShow(false)
        }).catch(() => {
            toast.error("Update unsuccessfully")
        });
    }

    // Delete item
    const [deleteItemShow, setDeleteItemShow] = useState(false)
    const [deletedMealName, setDeletedMealName] = useState('')

    const saveDeletedMeal = (e) => {
        e.preventDefault()

        fetch(`http://${window.location.host.split(":")[0]}:8000/meal/${mealID}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then(() => {
            toast.success('Delete successfully')

            fetch(`http://` + window.location.host.split(":")[0] + `:8000/meal?restaurant=${username}`)
                .then(response => response.json())
                .then(jsonData => setMenuItem(jsonData))

            setDeleteItemShow(false)
        }).catch(() => {
            toast.error("Delete unsuccessfully")
        });
    }

    return (
        <>
            <NavBarRestaurant />
            <div className='rest-menu-item-container'>
                <Subheading title={'Menu Item'} />
                <div className='rest-menu-item-action'>
                    <div className='action-search'>
                        <input type='text' id='search' placeholder='search with food name ...' onChange={handleSearch}/>
                        <label htmlFor='search'><i className="fa-solid fa-magnifying-glass"></i></label>
                    </div>
                    <button onClick={() => {
                        setAddNewItemShow(true)
                        setModifyItemShow(false)
                        setDeleteItemShow(false)
                    }}>Add<i className="fa-solid fa-plus"></i></button>
                </div>
                <div className='rest-menu-item-table'>
                    <div className='rest-menu-item-table-heading'>
                        <div className='rest-menu-item-table-cell'>
                            <p>Meal Name</p>
                        </div>
                        <div className='rest-menu-item-table-cell'>
                            <p>Meal Image</p>
                        </div>
                        <div className='rest-menu-item-table-cell'>
                            <p>Stock Status</p>
                        </div>
                        <div className='rest-menu-item-table-cell'>
                            <p>Modify</p>
                        </div>
                        <div className='rest-menu-item-table-cell'>
                            <p>Delete</p>
                        </div>
                    </div>

                    {
                        menuItem.length > 0 && menuItem.map(item => (
                            <div className='rest-menu-item-table-row' key={item.id}>
                                <div className='row-first-element'>
                                    <div className='rest-menu-item-table-cell'>
                                        <p>{item.foodName}</p>
                                    </div>
                                    <div className='rest-menu-item-table-cell'>
                                        <img src={process.env.PUBLIC_URL + '/img/' + item.img} style={{ width: '70%' }} />
                                    </div>
                                    <div className='rest-menu-item-table-cell'>
                                        <p>Available</p>
                                    </div>
                                    <div className='rest-menu-item-table-cell'>
                                        <button
                                            onClick={() => {
                                                setModifyItemShow(true)
                                                setAddNewItemShow(false)
                                                setDeleteItemShow(false)
                                                showEditIteminfo(item.id, item.img)
                                                setMealID(item.id)
                                            }}
                                        ><i className="fa-solid fa-pen-to-square"></i></button>
                                    </div>
                                    <div className='rest-menu-item-table-cell'>
                                        <button
                                            onClick={() => {
                                                setDeleteItemShow(true)
                                                setAddNewItemShow(false)
                                                setModifyItemShow(false)
                                                setMealID(item.id)
                                                setDeletedMealName(item.foodName)
                                            }}
                                        ><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                                <div className='row-second-element'>
                                    <p><strong>Food Price : </strong>{item.price}</p>
                                    <p><strong>Food Style : </strong>{item.foodStyle}</p>
                                    <p><strong>Food Description :</strong></p>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                addNewItemShow &&
                <div className='add-newItem-container'>
                    <div className='add-newItem-heading'>
                        <h2>Add New Meal</h2>
                        <button onClick={() => {
                            setAddNewItemShow(false)
                            clearAddMealForm()
                        }}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='add-newItem-mainContent'>
                        <div className='muti-input-group' style={{ marginBottom: '25px' }}>
                            <div className='input-group' style={{ marginLeft: '3%' }}>
                                <input
                                    value={mealName}
                                    onChange={(e) => setMealName(e.target.value)}
                                    type='text'
                                    required />
                                <label style={labelStyle}>Meal Name</label>
                            </div>
                            <div className='dropdown-list-group' style={{ width: '100%' }}>
                                <div className='input-group'>
                                    <input
                                        value={mealStyle}
                                        type='text'
                                        onChange={(e) => { }}
                                        required />
                                    <button
                                        id='dropdown-btn1'
                                        className='dropdown-btn'
                                        style={{ right: '35px', background: 'transparent' }}
                                        onClick={showStyleList}><i className="fa-solid fa-caret-down"></i></button>
                                    <label style={labelStyle}>Meal Style</label>
                                </div>
                                <div className='input-option' id='input-option1'>
                                    {
                                        mealStyleList.map((data, index) => (
                                            <div key={index} onClick={() => setMealStyle(data)} style={{ width: '200px' }}>
                                                <p onClick={closeStyleList}>{data}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='muti-input-group'>
                            <div className='input-group' style={{ marginLeft: '3%' }}>
                                <input
                                    value={mealPrice}
                                    onChange={(e) => setMealPrice(e.target.value)}
                                    type='text'
                                    required />
                                <label style={labelStyle}>Meal Price</label>
                            </div>
                            <div className='input-group'>
                                <input
                                    // value={mealImage}
                                    onChange={(e) => {
                                        handleAddImageChange(e)
                                        setMealImage(e.target.value)
                                    }}
                                    type='file'
                                    style={{ padding: '8px 10px 0 10px', height: '32px' }}
                                />
                                <label style={labelStyle}>Meal Image</label>
                            </div>
                        </div>
                        <div className='image-action'>
                            <p>Image Preview :</p>
                            <div className='image-area'>
                                {
                                    addImage && (
                                        <img
                                            alt="not found"
                                            src={URL.createObjectURL(addImage)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className='input-group'>
                            <textarea
                                value={mealDescription}
                                onChange={(e) => setMealDescription(e.target.value)}
                                style={{ width: '91%', marginLeft: '3%', height: '80px' }}
                                required></textarea>
                            <label style={{ marginLeft: '3%', backgroundColor: '#e6e6e8' }}>Meal Description</label>
                        </div>
                    </div>
                    <div className='add-newItem-btn'>
                        <button
                            onClick={(e) => {
                                saveNewMeal(e)
                            }}
                        >Save</button>
                    </div>
                </div>
            }

            {
                modifyItemShow &&
                <div className='modifyItem-container'>
                    <div className='modifyItem-heading'>
                        <h2>Modify Meal</h2>
                        <button onClick={() => {
                            setModifyItemShow(false)
                            clearAddMealForm()
                        }}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='modifyItem-mainContent'>
                        <div className='muti-input-group' style={{ marginBottom: '25px' }}>
                            <div className='input-group' style={{ marginLeft: '3%' }}>
                                <input
                                    onChange={(e) => setEditMealName(e.target.value)}
                                    id='oldMealName'
                                    type='text'
                                    required />
                                <label style={labelStyle}>Meal Name</label>
                            </div>
                            <div className='dropdown-list-group' style={{ width: '100%' }}>
                                <div className='input-group'>
                                    <input
                                        id='oldMealStyle'
                                        value={editMealStyle}
                                        type='text'
                                        onChange={(e) => { }}
                                        required />
                                    <button
                                        id='dropdown-btn1'
                                        className='dropdown-btn'
                                        style={{ right: '35px', background: 'transparent' }}
                                        onClick={showStyleList}><i className="fa-solid fa-caret-down"></i></button>
                                    <label style={labelStyle}>Meal Style</label>
                                </div>
                                <div className='input-option' id='input-option1'>
                                    {
                                        mealStyleList.map((data, index) => (
                                            <div key={index} onClick={() => setEditMealStyle(data)} style={{ width: '200px' }}>
                                                <p onClick={closeStyleList}>{data}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='muti-input-group'>
                            <div className='input-group' style={{ marginLeft: '3%' }}>
                                <input
                                    onChange={(e) => setEditMealPrice(e.target.value)}
                                    id='oldMealPrice'
                                    type='text'
                                    required />
                                <label style={labelStyle}>Meal Price</label>
                            </div>
                            <div className='input-group'>
                                <input
                                    type='file'
                                    style={{ padding: '8px 10px 0 10px', height: '32px' }}
                                    onChange={(e) => {
                                        handleModifyImageChange(e)
                                        setEditMealImage(e.target.value)
                                    }}
                                />
                                <label style={labelStyle}>Meal Image</label>
                            </div>
                        </div>
                        <div className='image-action'>
                            <p>Image Preview :</p>
                            <div className='image-area'>
                                {
                                    modifyImage ? (
                                        <img
                                            alt="not found"
                                            src={URL.createObjectURL(modifyImage)}
                                        />
                                    ) : (
                                        <img id="oldMealImage" />
                                    )
                                }
                            </div>
                        </div>
                        <div className='input-group'>
                            <textarea
                                onChange={(e) => setEditMealDescription(e.target.value)}
                                id='oldMealDesc'
                                style={{ width: '91%', marginLeft: '3%', height: '80px' }}
                                required></textarea>
                            <label style={{ marginLeft: '3%', backgroundColor: '#e6e6e8' }}>Meal Description</label>
                        </div>
                    </div>
                    <div className='modifyItem-btn'>
                        <button
                            onClick={(e) => {
                                saveEditMeal(e)
                            }}
                        >Save</button>
                    </div>
                </div>
            }

            {
                deleteItemShow && 
                <div className='deleteItem-container'>
                    <div className='deleteItem-heading'>
                        <h2>Confirm message <i className="fa-solid fa-square-check"></i></h2>
                        <button onClick={() => setDeleteItemShow(false)}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className='deleteItem-mainContent'>
                        <div className='deleteItem-mainContent-body'>
                            <h3>Do you confirm to delete meal <span>(Name : {deletedMealName})</span> ?</h3>
                            <button onClick={(e) => saveDeletedMeal(e)}>Delete</button>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}


