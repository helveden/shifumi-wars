<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220705130200 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, mode INT NOT NULL, type INT NOT NULL, status INT NOT NULL, well_status SMALLINT NOT NULL, players LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE round (id INT AUTO_INCREMENT NOT NULL, game_id INT NOT NULL, players LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', order_number INT NOT NULL, winner VARCHAR(255) DEFAULT NULL, looser VARCHAR(255) DEFAULT NULL, status INT NOT NULL, INDEX IDX_C5EEEA34E48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_round (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, round_id INT DEFAULT NULL, choice INT DEFAULT NULL, result VARCHAR(255) DEFAULT NULL, INDEX IDX_272C116CA76ED395 (user_id), INDEX IDX_272C116CA6005CA0 (round_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE round ADD CONSTRAINT FK_C5EEEA34E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE user_round ADD CONSTRAINT FK_272C116CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_round ADD CONSTRAINT FK_272C116CA6005CA0 FOREIGN KEY (round_id) REFERENCES round (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE round DROP FOREIGN KEY FK_C5EEEA34E48FD905');
        $this->addSql('ALTER TABLE user_round DROP FOREIGN KEY FK_272C116CA6005CA0');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE round');
        $this->addSql('DROP TABLE user_round');
    }
}
