
import { Request, Response } from 'express';
import { TempModel} from '../models/temp.model';

export async function getTemp(req: Request, res: Response) {
  try {
    const data = await TempModel.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createTemp(req: Request, res: Response) {
  try {
    const { roomTemp, desiredTemp, fanStatus } = req.body;

    const newTemp = new TempModel({
      roomTemp,
      desiredTemp,
      fanStatus,
    });

    await newTemp.save();

    return res.status(201).json(newTemp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateTemp(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { roomTemp, desiredTemp, fanStatus } = req.body;

    const temp = await TempModel.findById(id);
    if (!temp) {
      return res.status(404).json({ message: "Temperature data not found" });
    }

    temp.roomTemp = roomTemp || temp.roomTemp;
    temp.desiredTemp = desiredTemp || temp.desiredTemp;
    temp.fanStatus = fanStatus || temp.fanStatus;

    await temp.save();

    return res.status(200).json(temp);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTemp(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const temp = await TempModel.findByIdAndDelete(id);

    if (!temp) {
      return res.status(404).json({ message: "Temperature data not found" });
    }

    return res.status(204).send(); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
