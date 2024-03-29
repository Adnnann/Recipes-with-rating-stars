import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Avatar from '../../assets/images/avatar.svg'
import CookbookIcon from '../../assets/images/CookbookIcon.png'
import AddRecipeIcon from '../../assets/images/AddRecipeIcon.svg'
import {useDispatch } from "react-redux"
import { resetStore,
        setAddRecipeModal,
        setFilterIcon,
        setUserProfileModalStatus,
        signoutUser,
        
} from '../../features/recipesSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signout = () => {
        dispatch(resetStore())
        dispatch(signoutUser())
        navigate('/')
    }

    const add = () => {
        dispatch(setFilterIcon(false))
        dispatch(setAddRecipeModal(true))
    }
    

    return(
    
 
        
        <Nav className="justify-content-start" 
        style={{marginBottom:"2%", borderBottomStyle:'solid', borderBottomWidth:'1px', marginTop:'2%'}}>
            
            <Nav.Item style={{marginLeft:"2%"}}>
                <Image src={CookbookIcon} width={'50px'} onClick={()=>navigate('/')}/>
            </Nav.Item>

            <Nav.Item style={{marginLeft:"2%"}}>
                <h1>Cookbook</h1>
            </Nav.Item>

            <Nav.Item style={{marginLeft:'auto', marginBottom:'2px'}} onClick={add}>
               {<Image src={AddRecipeIcon} width={'50px'} /> } 
            </Nav.Item>

            
            <Nav.Item style={{marginLeft:"1%", marginRight:"2%"}}>
                <Dropdown>

                    <Dropdown.Toggle style={{backgroundColor:"white", borderStyle:'none'}}>
                        <Image src={Avatar} as={ButtonGroup} style={{backgroundColor:"white"}} width={'50px'} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>dispatch(setUserProfileModalStatus(true))}>My Profile</Dropdown.Item>
                        <Dropdown.Item onClick={()=>navigate('/userRecipes')}>My Recepies</Dropdown.Item>
                        <Dropdown.Item onClick={signout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>

            </Nav.Item>
            
      </Nav>
   

    )
}

export default Header