<?php
// Conexão com o banco de dados
$host = 'localhost';
$user = 'SEU_USUARIO';
$pass = 'SUA_SENHA';
$db   = 'frutamina_site';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Erro de conexão: ' . $conn->connect_error);
}

// Recebe os dados do formulário
$nome     = $_POST['name'] ?? '';
$telefone = $_POST['phone'] ?? '';
$segmento = $_POST['ramo'] ?? '';
$email    = $_POST['email'] ?? '';
$assunto  = $_POST['subject'] ?? '';
$mensagem = $_POST['message'] ?? '';

// Prepara e executa a query
$stmt = $conn->prepare("INSERT INTO mensagens_contato (nome, telefone, segmento, email, assunto, mensagem) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nome, $telefone, $segmento, $email, $assunto, $mensagem);

if ($stmt->execute()) {
    echo "Mensagem enviada com sucesso!";
} else {
    echo "Erro ao enviar mensagem.";
}

$stmt->close();
$conn->close();
?> 