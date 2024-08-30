import app from './app';
import dotenv from 'dotenv'

dotenv.config();

app.listen(3000, () => {
    console.log("⚙️ Server is running at port 3000");
});