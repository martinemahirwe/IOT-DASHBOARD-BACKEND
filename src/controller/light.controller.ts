
import { Request, Response } from 'express';
import { lightModel } from '../models/light.model';

export async function getLightStatus(req: Request, res: Response) {
  try {
    const light = await lightModel.findOne();
    return res.status(200).json(light);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateLightStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;

    const light = await lightModel.findOne();
    if (!light) {
      return res.status(404).json({ message: "Light data not found" });
    }

    light.status = status || light.status;
    await light.save();

    return res.status(200).json(light);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
