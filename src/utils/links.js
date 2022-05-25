import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { FiUser } from "react-icons/fi";


let links = [
    {
        link : 'Home',
        linkTo : '/',
        Icon : MdOutlineSpaceDashboard,
    },
    {
        link : 'Add',
        linkTo : '/addAppointments',
        Icon : BiAddToQueue,
    },
        {
        link : 'Profile',
        linkTo : '/profile',
        Icon : FiUser,
    },
        {
        link : 'About us',
        linkTo : '/about',
        Icon : VscPreview,
    },
]


export default links;