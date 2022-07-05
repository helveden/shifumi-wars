<?php

namespace App\Entity;

use App\Repository\RoundRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RoundRepository::class)
 */
class Round
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Game::class, inversedBy="rounds")
     * @ORM\JoinColumn(nullable=false)
     */
    private $game;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $players = [];

    /**
     * @ORM\Column(type="integer")
     */
    private $order_number;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $winner;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $looser;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=UserRound::class, mappedBy="round")
     */
    private $userRounds;

    public function __construct()
    {
        $this->userRounds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function getPlayers(): ?array
    {
        return $this->players;
    }

    public function setPlayers(?array $players): self
    {
        $this->players = $players;

        return $this;
    }

    public function getOrderNumber(): ?int
    {
        return $this->order_number;
    }

    public function setOrderNumber(int $order_number): self
    {
        $this->order_number = $order_number;

        return $this;
    }

    public function getWinner(): ?string
    {
        return $this->winner;
    }

    public function setWinner(?string $winner): self
    {
        $this->winner = $winner;

        return $this;
    }

    public function getLooser(): ?string
    {
        return $this->looser;
    }

    public function setLooser(?string $looser): self
    {
        $this->looser = $looser;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, UserRound>
     */
    public function getUserRounds(): Collection
    {
        return $this->userRounds;
    }

    public function addUserRound(UserRound $userRound): self
    {
        if (!$this->userRounds->contains($userRound)) {
            $this->userRounds[] = $userRound;
            $userRound->setRound($this);
        }

        return $this;
    }

    public function removeUserRound(UserRound $userRound): self
    {
        if ($this->userRounds->removeElement($userRound)) {
            // set the owning side to null (unless already changed)
            if ($userRound->getRound() === $this) {
                $userRound->setRound(null);
            }
        }

        return $this;
    }
}
