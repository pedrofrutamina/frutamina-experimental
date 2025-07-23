<?php
session_start();
if (!isset($_SESSION['admin_logado']) || $_SESSION['admin_logado'] !== true) {
    header('Location: admin-login.php');
    exit;
}

// Conexão com o banco de dados
$host = 'localhost';
$user = 'SEU_USUARIO';
$pass = 'SUA_SENHA';
$db   = 'frutamina_site';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Erro de conexão: ' . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM mensagens_contato ORDER BY data_envio DESC");
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel de Mensagens - Frutamina</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f1f7fc; margin: 0; }
        .container { max-width: 900px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 0 20px #0001; padding: 2rem; }
        h2 { margin-bottom: 2rem; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.7rem; border-bottom: 1px solid #eee; text-align: left; }
        th { background: #f1f7fc; }
        tr:hover { background: #f9f9f9; }
        .logout { float: right; background: #036dda; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; margin-top: -2.5rem; }
    </style>
</head>
<body>
    <div class="container">
        <a href="admin-logout.php" class="logout">Sair</a>
        <h2>Mensagens Recebidas</h2>
        <table>
            <tr>
                <th>Data</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Segmento</th>
                <th>Email</th>
                <th>Assunto</th>
                <th>Mensagem</th>
            </tr>
            <?php while($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= date('d/m/Y H:i', strtotime($row['data_envio'])) ?></td>
                <td><?= htmlspecialchars($row['nome']) ?></td>
                <td><?= htmlspecialchars($row['telefone']) ?></td>
                <td><?= htmlspecialchars($row['segmento']) ?></td>
                <td><?= htmlspecialchars($row['email']) ?></td>
                <td><?= htmlspecialchars($row['assunto']) ?></td>
                <td><?= nl2br(htmlspecialchars($row['mensagem'])) ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>
</body>
</html>
<?php $conn->close(); ?> 