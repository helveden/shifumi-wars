<?php

namespace App\Entity;

use App\Repository\UserRoundRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserRoundRepository::class)
 */
class UserRound
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="userRounds")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Round::class, inversedBy="userRounds")
     */
    private $round;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $choice;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $result;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getRound(): ?Round
    {
        return $this->round;
    }

    public function setRound(?Round $round): self
    {
        $this->round = $round;

        return $this;
    }

    public function getChoice(): ?int
    {
        return $this->choice;
    }

    public function setChoice(?int $choice): self
    {
        $this->choice = $choice;

        return $this;
    }

    public function getResult(): ?string
    {
        return $this->result;
    }

    public function setResult(?string $result): self
    {
        $this->result = $result;

        return $this;
    }
}
