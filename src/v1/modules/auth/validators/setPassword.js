import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().min(6),
    tempId: Joi.string().guid().required(),
    secretKey: Joi.string().optional(),
  }),
});
