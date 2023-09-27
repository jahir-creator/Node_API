import { getConnection } from "./../database/database";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, programadores FROM language");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, programadores FROM language WHERE id = ?", id);
        // Comprueba si se encontró un resultado
        if (result.length === 0) {
            res.status(404);
            res.json({ message: "No se encontró ningún elemento con el ID proporcionado." });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { nombre, programadores } = req.body;
        // Verifica si nombre y programadores están presentes en la solicitud
        if (!nombre || programadores === undefined) {
            res.status(400).json({ message: "Se requieren tanto 'nombre' como 'programadores' en la solicitud." })
            return;
        }

        const language = { nombre, programadores }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO language SET ?", language);
        res.json({ message: "Agregado correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM language WHERE id = ?", id);

        // Comprueba el valor affectedRows para determinar si se eliminó un elemento
        if (result.affectedRows === 0) {
            res.status(404);
            res.json({ message: `No se encontró ningún elemento con el ID ${id}.` });
        } else {
            res.json({ message: `Elemento con el ID ${id} eliminado correctamente.` });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, programadores } = req.body;

        if (id === undefined) {
            res.status(400).json({ message: "Solicitud incorrecta. Proporcione al menos un campo para actualizar." });
            return;
        }

        // Crear un objeto 'language' con los campos a actualizar
        const language = {};

        if (nombre !== undefined && nombre !== "") {
            language.nombre = nombre;
        }

        if (programadores !== undefined) {
            language.programadores = programadores;
        }

        // Verificar si se proporcionó al menos un campo válido para actualizar
        if (Object.keys(language).length === 0) {
            res.status(400).json({ message: "Solicitud incorrecta. Proporcione al menos un campo válido para actualizar." });
            return;
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: `No se encontró ningún elemento con el ID ${id}.` });
        } else {
            res.json({ message: `Elemento con el ID ${id} actualizado correctamente.` });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const methods = {
    getLanguages,
    getLanguage,
    addLanguage,
    deleteLanguage,
    updateLanguage
}