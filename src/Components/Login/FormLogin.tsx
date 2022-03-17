import 'react-toastify/dist/ReactToastify.css';
import React,{ useContext } from 'react'
import { useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import { UserContext } from '../../Provider/UserProvider';
import { AuthApi } from '../../Services/Auth';
import { GetCurrentUser } from '../../Services/UserAPI';
import { useNavigate } from 'react-router-dom';


const FormLogin = () => {

    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    toast.configure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        const response = await AuthApi(data.name, data.password);
        
        if(response.status >= 200 && response.status <= 299){
            localStorage.setItem('token', response.token);
            let infosUser = await GetCurrentUser();
            setUser(infosUser);
            toast.success('You are loged on !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            switch (infosUser.roleId) {
                case 1:
                    navigate('/admin/ingredients')
                    break;
                case 2:
                    navigate('/terminal')
                    break;
                case 3:
                    navigate('/kitchen')
                    break;
            }
        }else if (response.status >= 400 && response.status<=500 ){
            toast.error('wrong information', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Name :</p>
            <input type="text" defaultValue="root" {...register("name", {required:true})} />
            <p>Password :</p>
            <input type="password" {...register("password", {required:true})}/>
            <input type="submit" value="Login" />

            {errors.email && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}
        </form>
    )
}





export default FormLogin