
import express from 'express';
import authRoutes from './routes/auth';
import vehicleRoutes from './routes/vehicles';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Top Gear Motors API' });
});

app.listen(PORT, () => {
  console.log(`Top Gear Motors Backend running on port ${PORT}`);
});

export default app;
