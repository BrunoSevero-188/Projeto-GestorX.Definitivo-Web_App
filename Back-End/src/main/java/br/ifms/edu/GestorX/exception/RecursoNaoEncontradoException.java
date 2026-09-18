package br.ifms.edu.GestorX.exception;


/**
 * Exceção lançada quando um recurso (entidade) não é encontrado.
 * Usada para retornar HTTP 404 nas controllers/services.
 */
public class RecursoNaoEncontradoException extends RuntimeException {

    public RecursoNaoEncontradoException() {
        super();
    }

    public RecursoNaoEncontradoException(String message) {
        super(message);
    }

    public RecursoNaoEncontradoException(String message, Throwable cause) {
        super(message, cause);
    }

    public RecursoNaoEncontradoException(Throwable cause) {
        super(cause);
    }
}
