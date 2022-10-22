import { celebrate, Joi, Segments } from "celebrate";

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    currentPassword: Joi.string().required().min(6),
    newPassword: Joi.string().required().min(6),
  }),
});
