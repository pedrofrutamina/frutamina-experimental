<?php
session_start();
$senha_correta = 'frutamina123'; // Altere para sua senha preferida
$erro = '';

if (isset($_POST['senha'])) {
    if ($_POST['senha'] === $senha_correta) {
        $_SESSION['admin_logado'] = true;
        header('Location: admin-mensagens.php');
        exit;
    } else {
        $erro = 'Senha incorreta!';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel Administrativo - Login</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f1f7fc; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .login-box { background: #fff; padding: 2rem 2.5rem; border-radius: 8px; box-shadow: 0 0 20px #0001; min-width: 320px; }
        h2 { margin-bottom: 1.5rem; }
        input[type=password] { width: 100%; padding: 0.7rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #036dda; color: #fff; border: none; padding: 0.7rem 1.5rem; border-radius: 4px; font-weight: bold; cursor: pointer; }
        .erro { color: #c00; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <form class="login-box" method="post">
        <h2>Painel Administrativo</h2>
        <?php if ($erro) echo '<div class="erro">'.$erro.'</div>'; ?>
        <input type="password" name="senha" placeholder="Digite a senha" required autofocus>
        <button type="submit">Entrar</button>
    </form>
</body>
</html> 