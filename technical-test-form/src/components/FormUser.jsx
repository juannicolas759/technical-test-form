import { useForm } from "react-hook-form"
import { Toaster, toast } from "react-hot-toast";
import addNewUser from "../services/addUser";

export function FormUser() {

    const documentType = [{
        id: 'CC',
        value: 'Cédula Ciudadanía'
    }, {
        id: 'NIT',
        value: 'Número Identificación Tributaria'
    }, {
        id: 'PA',
        value: 'Pasaporte'
    }]

    const regexPhoneNumber = RegExp(/^(\+\d{1,3}( )?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/)

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const notify = () => toast('Here is your toast.');

    async function onSubmit(data) {
        try {
            const responseText = await addNewUser(data);
            toast.success(responseText);
            reset()
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    }

    return (
        <div className="card">
            <div className="title">
            <strong>Registro de cliente</strong>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div >
                        <label htmlFor="">Tipo de documento</label>
                    </div>
                    <select name="" {...register('documentType', { required: true })}>
                        <option>Seleccione:</option>
                        {documentType.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.id + ' - ' + type.value}
                            </option>
                        ))}
                    </select>
                    {errors.documentType?.type === 'required' && <p>El campo es requerido</p>}
                </div>
                <div>
                    <div>
                        <label htmlFor="">Documento</label>
                    </div>
                    <input type="text" {...register('document', { required: true })} />
                    {errors.document?.type === 'required' && <p>El campo es requerido</p>}
                </div>
                <div>
                    <div>
                        <label htmlFor="">Nombres</label>
                    </div>
                    <input type="text" {...register('names', { required: true })} />
                    {errors.names?.type === 'required' && <p>El campo es requerido</p>}
                </div>
                <div>
                    <div>
                        <label htmlFor="">Apellidos</label>
                    </div>
                    <input type="text" {...register('surnames', { required: true })} />
                    {errors.surnames?.type === 'required' && <p>El campo es requerido</p>}
                </div>
                <div>
                    <div>
                        <label htmlFor="">Teléfono</label>
                    </div>
                    <input type="text" {...register('phone', { required: true, pattern: regexPhoneNumber })} />
                    {errors.phone?.type === 'required' && <p>El campo es requerido</p>}
                    {errors.phone?.type === 'pattern' && <p>El formato del número no es valido</p>}

                </div>
                <div>
                    <div>
                        <label htmlFor="">Dirección</label>
                    </div>
                    <input type="text" {...register('fullAddress', { required: true })} />
                    {errors.fullAddress?.type === 'required' && <p>El campo es requerido</p>}
                </div>
                <div className="align-button">
                    <button type="submit">Registrar</button>
                </div>
                <Toaster />
            </form>
        </div>
    )
}