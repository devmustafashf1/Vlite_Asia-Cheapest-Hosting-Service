
export const generateId = () => {
    let str='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    let id = '';
    for(let i=0;i<5;i++){
        let index = Math.floor(Math.random()*str.length);
        id += str[index];
    }
    return id;
}