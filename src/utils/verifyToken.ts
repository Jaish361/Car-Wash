import { CustomJwtPayload } from '@/interface/interface';
import {jwtDecode} from 'jwt-decode';

export const verifyToken = (token:string):CustomJwtPayload=>{
    return jwtDecode(token)
}